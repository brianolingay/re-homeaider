import { ProviderServiceModel } from "./../models/ProviderService";
import * as bcrypt from "bcryptjs";
import { UserModel } from "../models/User";
import { RoleModel } from "../models/Role";
// import { CategoryModel } from "../models/Category";
import { ServiceModel } from "../models/Service";

const userRole = async (roleName: string, userInput: any) => {
  const roleExist = await RoleModel.findOne({ name: roleName }).exec();

  if (!roleExist) {
    let roleKey = roleName.toLowerCase();

    const arrKeyVal = roleKey.match(/\S+/g);

    if (arrKeyVal && arrKeyVal.length > 1) {
      roleKey = arrKeyVal.join("_");
    }

    const role = new RoleModel({ name: roleName, key: roleKey });

    await role.save();
    const email = userInput.email;
    const userExist = await UserModel.findOne({
      email,
    }).exec();

    const services = await ServiceModel.find({})
      .lean()
      .exec();

    if (!userExist) {
      const user = new UserModel({
        ...userInput,
        password: await bcrypt.hash("homeaider", bcrypt.genSaltSync(10)),
        mobile: "09271221146",
        role: role._id,
      });

      await user.save();

      if (roleKey === "provider") {
        for (let service of services) {
          console.log(service);
          const providerService = new ProviderServiceModel({
            description: `Sample Service ${service._id}`,
            user: user._id,
            service: service._id,
          });

          await providerService.save();

          user.providerServices.push(providerService._id);

          await user.save();
        }
      }
    }
  }
};

// const defaultCategoriesAndServices = async () => {
//   const categories = [
//     {
//       name: "Home Keeping/Repair",
//       description: "Default",
//       services: [
//         {
//           name: "Plumbing",
//           description: "Default",
//         },
//         {
//           name: "House Paint Renewal",
//           description: "Default",
//         },
//       ],
//     },
//     {
//       name: "Massage",
//       description: "Default",
//       services: [
//         {
//           name: "Full Body Massage",
//           description: "Default",
//         },
//         {
//           name: "Foot Massage",
//           description: "Default",
//         },
//       ],
//     },
//     {
//       name: "Computer Installation/Repair",
//       description: "Default",
//       services: [
//         {
//           name: "Window OS Install",
//           description: "Default",
//         },
//         {
//           name: "Computer Reformatting",
//           description: "Default",
//         },
//       ],
//     },
//   ];

//   const firstCategory = categories[0];
//   const alreadyExists = await CategoryModel.findOne({
//     name: firstCategory.name,
//   }).exec();

//   if (!alreadyExists) {
//     for (let item of categories) {
//       const { services, ...cat } = item;
//       const category = new CategoryModel(cat);
//       await category.save();

//       for (let service of services) {
//         const serv = new ServiceModel({ ...service, category: category._id });
//         await serv.save();

//         (category as any).services.push(serv);
//         await category.save();
//       }
//     }
//   }
// };

export const defaultUserAndRole = async () => {
  const users = [
    {
      roleName: "Admin",
      userInput: {
        email: "admin@homeaider.com",
        firstName: "Admin",
        lastName: "Homeaider",
      },
    },
    {
      roleName: "Provider",
      userInput: {
        email: "provider@homeaider.com",
        firstName: "Provider",
        lastName: "Homeaider",
      },
    },
    {
      roleName: "Service Seeker",
      userInput: {
        email: "archie@homeaider.com",
        firstName: "Archie",
        lastName: "Olingay",
      },
    },
  ];
  //await defaultCategoriesAndServices();
  for (let user of users) {
    const { roleName, userInput } = user;
    await userRole(roleName, userInput);
  }
};

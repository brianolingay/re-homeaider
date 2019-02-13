import * as bcrypt from "bcryptjs";
import { UserModel } from "../models/User";
import { RoleModel } from "../models/Role";
import { CategoryModel } from "../models/Category";
import { ServiceModel } from "../models/Service";

const userRole = async (roleName: string, userInput: any) => {
  let services = null;
  const roleExist = await RoleModel.findOne({ name: roleName }).exec();

  if (!roleExist) {
    const role = new RoleModel({ name: roleName });

    await role.save();
    const email = userInput.email;
    const userExist = await UserModel.findOne({
      email,
    }).exec();

    if (roleName === "provider") {
      services = await ServiceModel.find({}, "_id")
        .lean()
        .exec();
    }
    if (!userExist) {
      const user = new UserModel({
        ...userInput,
        password: await bcrypt.hash("homeaider", bcrypt.genSaltSync(10)),
        mobile: "09271221146",
        role: role._id,
        services,
      });

      await user.save();
    }
  }
};

const defaultCategoriesAndServices = async () => {
  const categories = [
    {
      name: "Home Keeping/Repair",
      description: "Default",
      services: [
        {
          name: "Plumbing",
          description: "Default",
        },
        {
          name: "House Paint Renewal",
          description: "Default",
        },
      ],
    },
    {
      name: "Massage",
      description: "Default",
      services: [
        {
          name: "Full Body Massage",
          description: "Default",
        },
        {
          name: "Foot Massage",
          description: "Default",
        },
      ],
    },
    {
      name: "Computer Installation/Repair",
      description: "Default",
      services: [
        {
          name: "Window OS Install",
          description: "Default",
        },
        {
          name: "Computer Reformatting",
          description: "Default",
        },
      ],
    },
  ];

  const firstCategory = categories[0];
  const alreadyExists = await CategoryModel.findOne({
    name: firstCategory.name,
  }).exec();

  if (!alreadyExists) {
    for (let item of categories) {
      const { services, ...cat } = item;
      const category = new CategoryModel(cat);
      await category.save();

      for (let service of services) {
        const serv = new ServiceModel({ ...service, category: category._id });
        await serv.save();

        (category as any).services.push(serv);
        await category.save();
      }
    }
  }
};

export const defaultUserAndRole = async () => {
  const users = [
    {
      roleName: "admin",
      userInput: {
        email: "admin@homeaider.com",
        firstName: "Admin",
        lastName: "Homeaider",
      },
    },
    {
      roleName: "provider",
      userInput: {
        email: "charlie@homeaider.com",
        firstName: "Charlie",
        lastName: "Descallar",
      },
    },
    {
      roleName: "service_seeker",
      userInput: {
        email: "archie@homeaider.com",
        firstName: "Archie",
        lastName: "Olingay",
      },
    },
  ];
  await defaultCategoriesAndServices();
  for (let user of users) {
    const { roleName, userInput } = user;
    await userRole(roleName, userInput);
  }
};

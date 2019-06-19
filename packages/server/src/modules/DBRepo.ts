export const DBRepository = (model: any) => ({
  async create(input: any) {
    const data = new model(input);
    return await data.save();
  },
  async delete(condition: any) {
    return await model.deleteOne(condition);
  },
  async doExists(condition: any, columns: string = "_id") {
    const exists = await model
      .findOne(condition, columns, {
        lean: true,
      })
      .exec();

    return exists;
  },
  async update(condition: any, input: any) {
    return await model.updateOne(condition, input);
  },
});

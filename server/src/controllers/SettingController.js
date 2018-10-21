module.exports = {
  create(req, res) {
    const setting = req.body;
    console.log(setting);
    // Setting.find({
    //   sensor: {
    //     _id: setting.sensor
    //   }
    // })
  }
};

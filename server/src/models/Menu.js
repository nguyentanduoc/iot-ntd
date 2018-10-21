import {
  Schema,
  model
} from 'mongoose';

var menuSchema = Schema({
  id: Schema.Types.ObjectId,
  name: String,
  redirect: String,
  icon: String
});
export default model('Menu', menuSchema);

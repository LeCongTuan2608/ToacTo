'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Message extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         models.Conversation.hasMany(Message, { as: 'message', foreignKey: 'conversation_id' });
         //  Message.belongsTo(models.Conversation, { foreignKey: 'conversation_id' });
         Message.belongsTo(models.Users, { foreignKey: 'sender' });
         // Message.belongsTo(models.Users, { foreignKey: 'receiver' });
      }
   }
   Message.init(
      {
         sender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               not: ['^[a-z]+$', 'i'],
            },
         },
         // receiver: {
         //    type: DataTypes.ARRAY(DataTypes.STRING),
         //    allowNull: false,
         // },
         content: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         member_remove_message: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: null,
         },
         // status_remove_receiver: {
         //    type: DataTypes.BOOLEAN,
         //    defaultValue: false,
         // },
         conversation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'Message',
         timestamps: true,
      },
   );
   return Message;
};

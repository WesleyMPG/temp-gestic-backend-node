'use strict';
module.exports = (sequelize, Sequelize) => {
    const Research = sequelize.define('research', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            field: 'rsrch_id'
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'rsrch_name'
        },
        description: {
            allowNull: false,
            type: Sequelize.TEXT,
            field: 'rsrch_description'
        },
        activities: {
            allowNull: false,
            type: Sequelize.TEXT,
            field: 'rsrch_activities'
        },
    }, {
        timestamps: true,
        tableName: 'researches'
    });

    Research.associate = (models) => {
        Research.belongsToMany(models.user, { 
            foreignKey: 'rsrch_id',
            through: 'rsrch_members',
            as: 'members',
            });
    }
    return Research;
}
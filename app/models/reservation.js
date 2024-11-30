module.exports = (sequelize, Sequelize) => {
    const reservation = sequelize.define("reservation", {
        reservationNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reservationDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        subscriberName: {
             type: Sequelize.STRING,
             allowNull: false,
             references: {
                model: 'subscriber',
                key: 'name'
             }
        },
        machineID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'machine',
                key: 'machineID'
            }
        },
        created_at: {
             type: Sequelize.DATE,
             allowNull: false,
             defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        tableName: "reservation",
        timestamps: false
    });
    return reservation;
}

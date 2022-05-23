"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "tasks", [{
                    id: 1,
                    description: "Grabar el curso de back",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    description: "Grabar el curso de front",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("tasks", null, {});
    },
};
const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG Create", () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy();
    })

    it("Should be able to create a new ONG", async () => {
        const response = await request(app)
        .post("/ongs")
        .send({
                name: "APAD2",
                email: "contato@test.com",
                whatsapp: "0000000000",
                city: "Rio do Sul",
                uf: "SC"
        });
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8)
    })

    it("Should be able to create a new ONG", async () => {
        beforeEach( async () => {
            await connection.migrate.rollback();
            await connection.migrate.latest();
        });
    
        const response = await request(app)
        .post("/ongs")
        .send({
                name: "APAD2",
                email: "contato@test.com",
                whatsapp: "0000000000",
                city: "Rio do Sul",
                uf: "SC"
        });
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8)
    })

    it("Sould be able to logon in a ong", async () => {
        const id = await request(app)
        .post("/ongs")
        .send({
            name: "APAD2",
            email: "contato@test.com",
            whatsapp: "0000000000",
            city: "Rio do Sul",
            uf: "SC"
        });

        const response = await request(app)
        .post("/sessions")
        .set("Authorization",id.body.id)
        .send({id: id.body.id});

        expect(response.body).toHaveProperty("name");  
    })
});


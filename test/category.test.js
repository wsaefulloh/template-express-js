const app = require("../app")
const request = require("supertest")

const standartRespone = {
    status: expect.any(Number),
    description: expect.any(String),
    result: expect.any(Array)
}

describe("service /category", () => {
    describe("GET /category", () => {
        test("should return status code 200", async () => {
            const respone = await request(app).get("/category")
            expect(respone.status).toBe(200)
        })
        test("should return with respone standart", async () => {
            const respone = await request(app).get("/category")
            expect(respone.body).toEqual(expect.objectContaining(standartRespone))
        })
    })

    //Example with another request

    // describe("POST /category", () => {
    //     test("should return status code 201", async () => {
    //         const respone =  (await request(app).post("/category").send({
    //             name_category : "name category"
    //         }))
    //         expect(respone.status).toBe(201)
    //     })
    // })

    // describe("DELETE /category", () => {
    //     test("should return status code 200", async () => {
    //         const respone = (await request(app).delete("/category/1"))
    //         expect(respone.status).toBe(200)
    //     })
    // })

    // describe("PUT /category", () => {
    //     test("should return status code 201", async () => {
    //         const respone = (await request(app).put("/category").send({
    //             id: 2,
    //             name_category: "name category",
    //         }))
    //         expect(respone.status).toBe(201)
    //     })
    // })
})
const express = require("express");
let router = express.Router();
const {numberNobels, categoryNobels, 
    NobelsMax, parAn, nobelsInfo, noNobels, all} = require("../controllers/nobels.controller.js");

router.get("/category", categoryNobels);
/**
 * @swagger
 * /nobels/category:
 *   get:
 *      description: List all category of nobels (F6)
 *      tags:
 *          - nobels
 *      parameters:
 *          - in: query
 *            name: page
 *            description: number of the page
 *            required: false
 *            type: integer
 *          - in: query
 *            name: limit
 *            description: limit of result per page
 *            required: false
 *            type: integer
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

router.get("/max", NobelsMax);
/**
 * @swagger
 * /nobels/max:
 *   get:
 *      description: return the category with the most number of laureates (F7)
 *      tags:
 *          - nobels
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

router.get("/year", parAn);
/**
 * @swagger
 * /nobels/year:
 *   get:
 *      description: Displays the number of laureates by year (F8),
 *                   Possibility to sort with query parameter "?sort=laureates" or "?sort=-laureates" (F11)
 *      tags:
 *          - nobels
 *      parameters:
 *          - in: query
 *            name: sort
 *            description: To sort the result
 *            required: false
 *            type: string
 *          - in: query
 *            name: page
 *            description: Number of the page
 *            required: false
 *            type: integer
 *          - in: query
 *            name: limit
 *            description: Limit of result per page
 *            required: false
 *            type: integer
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

router.get("/laureateId=:id", nobelsInfo);
/**
 * @swagger
 * /nobels/laureateId={id}:
 *   get:
 *      description: Display information of a laureate by id with its prizes (F9)
 *      tags:
 *          - nobels
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Laureate ID
 *            required: true
 *            type: integer
 *          - in: query
 *            name: page
 *            description: Number of the page
 *            required: false
 *            type: integer
 *          - in: query
 *            name: limit
 *            description: Limit of result per page
 *            required: false
 *            type: integer
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

router.get("/noNobels", noNobels);
/**
 * @swagger
 * /nobels/noNobels:
 *   get:
 *      description: Show all years in which no Nobel Prize was awarded been awarded. (F10)
 *      tags:
 *          - nobels
 *      parameters:
 *          - in: query
 *            name: page
 *            description: Number of the page
 *            required: false
 *            type: integer
 *          - in: query
 *            name: limit
 *            description: Limit of result per page
 *            required: false
 *            type: integer
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

router.get("/all", all);

router.get("/", numberNobels);
/**
 * @swagger
 * /nobels:
 *   get:
 *      description: Used to count the number of prizes offered (F3)
 *      tags:
 *          - nobels
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

module.exports = router;
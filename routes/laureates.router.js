const express = require("express");
let router = express.Router();
const {list, severalNobels, laureatesFilter, deleteLaureates,
    editMotivationLaureates, addLaureates} = require("../controllers/laureates.controller.js");

// router.get("/id=:id", afficheInfo);
// /**
//  * @swagger
//  * /laureates/id={id}:
//  *   get:
//  *      description: firstname and surname of laureates with id = {id} (F2)
//  *      tags:
//  *          - laureates
//  *      parameters:
//  *          - in: path
//  *            name: id
//  *            description: Laureate ID
//  *            required: true
//  *            type: integer
//  *      responses:
//  *          '200':
//  *              description: Resource updated successfully
//  *          '500':
//  *              description: Internal server error
//  *          '400':
//  *              description: Bad request
// */

router.get("/severalNobels", severalNobels);
/**
 * @swagger
 * /laureates/severalNobels:
 *   get:
 *      description: List laureates which more 1 one nobels offered (F5)
 *      tags:
 *          - laureates
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

router.get("/filter", laureatesFilter);
/**
 * @swagger
 * /laureates/filter:
 *   get:
 *      description: From the first name, or the last name, or the category, display all the laureates that match the filter. (F12)
 *      tags:
 *          - laureates
 *      parameters:
 *          - in: query
 *            name: firstname
 *            description: Firstname of laureates
 *            required: false
 *            type: string
 *          - in: query
 *            name: surname
 *            description: Surname of laureates
 *            required: false
 *            type: string
 *          - in: query
 *            name: category
 *            description: Category of nobels
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

router.get("/:id?", list);
/**
 * @swagger
 * /laureates/{id}:
 *   get:
 *      description: Used to list all laureates (id, firstname, surname) without duplicate, you can use ?page={number}&limit={number} (F1),
 *                   "totalResult" is the number of laureates which receive prize, without duplicate (F4).
 *                   You can enter an id after /laureates/ to display id, firstname and surname of laureates with id = {id} (F2)
 *      tags:
 *          - laureates
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Laureate ID
 *            required: false
 *            type: integer
 *          - in: query
 *            name: page
 *            description: Number of the page (work without id)
 *            required: false
 *            type: integer
 *          - in: query
 *            name: limit
 *            description: Limit of result per page (work without id)
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

router.post("/add", addLaureates);
/**
 * @swagger
 * /laureates/add:
 *   post:
 *      description: Add a new laureate to a given year and category data. (F15)
 *      tags:
 *          - laureates
 *      parameters:
 *          - in: query
 *            name: firstname
 *            description: Firstname of laureates
 *            required: true
 *            type: string
 *          - in: query
 *            name: surname
 *            description: Surname of laureates
 *            required: true
 *            type: string
 *          - in: query
 *            name: motivation
 *            description: Motivation of the laureate
 *            required: true
 *            type: string
 *          - in: query
 *            name: share
 *            description: Share of the laureate
 *            required: false
 *            type: integer
 *          - in: query
 *            name: year
 *            description: Year of the Nobel Prize
 *            required: true
 *            type: integer
 *          - in: query
 *            name: category
 *            description: Category of the Nobel Prize
 *            required: true
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


router.put("/editMotivation", editMotivationLaureates);
/**
 * @swagger
 * /laureates/editMotivation:
 *   put:
 *      description: Used to edit motivation of a laureate by id, year, and category (F14)
 *      tags:
 *          - laureates
 *      parameters:
 *          - in: query
 *            name: motivation
 *            description: Motivation of a Laureate
 *            required: true
 *            type: string
 *          - in: query
 *            name: id
 *            description: Laureate ID
 *            required: true
 *            type: integer
 *          - in: query
 *            name: year
 *            description: Year of the Nobel Prize
 *            required: true
 *            type: string
 *          - in: query
 *            name: category
 *            description: Category of the Nobel Prize
 *            required: true
 *            type: string
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

router.delete("/delete", deleteLaureates);
/**
 * @swagger
 * /laureates/delete:
 *   delete:
 *      description: Used to delete a laureate by id, year, and category (F13)
 *      tags:
 *          - laureates
 *      parameters:
 *          - in: query
 *            name: id
 *            description: Laureate ID
 *            required: true
 *            type: integer
 *          - in: query
 *            name: year
 *            description: Year of the Nobel Prize
 *            required: true
 *            type: string
 *          - in: query
 *            name: category
 *            description: Category of the Nobel Prize
 *            required: true
 *            type: string
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

module.exports = router;
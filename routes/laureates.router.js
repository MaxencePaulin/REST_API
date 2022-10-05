const express = require("express");
var router = express.Router();
const {list, afficheInfo, severalNobels, laureatesFilter, deleteLaureates} = require("../controllers/laureates.controller.js");

router.get("/id=:id", afficheInfo);
router.get("/severalNobels", severalNobels);
router.get("/filter", laureatesFilter);
router.get("/", list);
router.delete("/delete", deleteLaureates);
/**
 * @swagger
 * /laureates/delete:
 *   delete:
 *      description: Used to delete a laureate by id, year, and category
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
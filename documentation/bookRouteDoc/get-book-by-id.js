/**
 * @swagger
 * /book/show/{id}:
 *   get:
 *     summary: Get book information by ID and recommendations
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *           example: "64bf2d0f72a3250017b45571"
 *     responses:
 *       '200':
 *         description: Successful response containing book data and recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 bookById:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64bf2d0f72a3250017b45571"
 *                     title:
 *                       type: string
 *                       example: "The Great Gatsby"
 *                     author_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64bf2d0f72a3250017b45575"
 *                         name:
 *                           type: string
 *                           example: "F. Scott Fitzgerald"
 *                     publisher_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64bf2d0f72a3250017b45580"
 *                         name:
 *                           type: string
 *                           example: "Scribner"
 *                     language_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64bf2d0f72a3250017b45582"
 *                         name:
 *                           type: string
 *                           example: "English"
 *                     genre_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64bf2d0f72a3250017b45583"
 *                         name:
 *                           type: string
 *                           example: "Classic"
 *                     storage_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64bf2d0f72a3250017b45584"
 *                         location:
 *                           type: string
 *                           example: "Shelf 3"
 *                 recommendation:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64bf2d0f72a3250017b45572"
 *                       title:
 *                         type: string
 *                         example: "To Kill a Mockingbird"
 *                       coverImageLink:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       author:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "64bf2d0f72a3250017b45575"
 *                             name:
 *                               type: string
 *                               example: "Harper Lee"
 *                       price:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "64bf2d0f72a3250017b45578"
 *                             amount:
 *                               type: number
 *                               example: 19.99
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */

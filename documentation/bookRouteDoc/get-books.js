/**
 * @swagger
 * /get-books:
 *   get:
 *     summary: Get new, sales, and bestseller books
 *     tags:
 *       - Books
 *     description: Returns a list of new books, books on sale, and bestseller books.
 *     responses:
 *       200:
 *         description: A list of books categorized by new, sales, and bestseller.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newBooks:
 *                   type: array
 *                   items:
 *                     type: object  # Указываем, что это массив объектов
 *                 salesBooks:
 *                   type: array
 *                   items:
 *                     type: object  # Указываем, что это массив объектов
 *                 bestsellerBooks:
 *                   type: array
 *                   items:
 *                     type: object  # Указываем, что это массив объектов
 *       500:
 *         description: Internal server error
 */

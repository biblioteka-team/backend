/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search books by title or author
 *     tags:
 *       - Books
 *     description: Search for books by matching the title or author's name.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query for book title or author name.
 *     responses:
 *       '200':
 *         description: Successful search result.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     searchResult:
 *                       type: array
 *                       items:
 *                         type: object  # Указываем, что это массив объектов
 *       '500':
 *         description: Internal server error
 */
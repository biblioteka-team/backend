/**
 * @swagger
 * /check-user:
 *   get:
 *     summary: Check if the user is logged in
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []  // Убедитесь, что этот security schema определен в Swagger
 *     responses:
 *       200:
 *         description: User is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier of the user
 *                       example: "60d5ec49b0192b001c4b5cb0"
 *                     name:
 *                       type: string
 *                       description: Name of the user
 *                       example: "John"
 *                     surname:
 *                       type: string
 *                       description: Surname of the user
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       description: Email address of the user
 *                       example: "johndoe@example.com"
 *       401:
 *         description: Unauthorized access (invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 */

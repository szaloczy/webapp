import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    //encrypt password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // save the newuser and the hashed password to the database
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        const defaultTodo = `Hello :) Add you first todo!`;
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        });

        //create a token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token  });

    } catch(err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

router.post('/login', async (req, res) => {
   const { username, password } = req.body;
   
   try {
    const user = await prisma.user.findUnique({
        where: { 
            username: username
        }
    });

    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
   } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
   }
});

export default router;
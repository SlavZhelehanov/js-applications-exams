import mongoose from 'mongoose';
import {randomUUID} from 'crypto';

const articleSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, 'Заглавието е задължително'],
            trim: true,
            minlength: [3, 'Заглавието трябва да е поне 3 символа'],
            maxlength: [100, 'Заглавието не може да надвишава 100 символа'],
        },
        category: {
            type: String,
            required: [true, 'Категорията е задължителна'],
            enum: {
                values: ['JavaScript', 'C#', 'Java', 'Python'],
                message: 'Категорията трябва да е една от: JavaScript, C#, Java, Python',
            },
        },
        content: {
            type: String,
            required: [true, 'Съдържанието е задължително'],
            trim: true,
        },
        articleId: {
            type: String,
            default: () => randomUUID(),
            unique: true,
            immutable: true,
        },
        creator: {
            type: String,
            required: [true, 'Създателят е задължителен'],
            trim: true,
        },
    }, {timestamps: true}
);

export default mongoose.model('Article', articleSchema);
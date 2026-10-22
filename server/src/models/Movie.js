import {model, Schema} from 'mongoose';
import {randomUUID} from 'crypto';

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Заглавието е задължително'],
        trim: true,
        minlength: [1, 'Заглавието трябва да е поне 1 символа'],
        maxlength: [100, 'Заглавието не може да надвишава 100 символа'],
    },
    description: {
        type: String,
        required: [true, 'Description е задължителна'],
        minlength: [1, 'Description трябва да е поне 1 символа'],
        maxlength: [100, 'Description не може да надвишава 100 символа'],
    },
    imageUrl: {
        type: String,
        required: [true, 'URL на изображението е задължителен'],
        match: [
            /^https?:\/\/[\w.-]+\.[a-z]{2,}\S*$/i,
            'URL на изображението трябва да е валиден адрес'
        ],
    },
    movieId: {
        type: String,
        default: () => randomUUID(),
        unique: true,
        immutable: true,
    },
    likedFrom: [],
    creator: {
        type: String,
        required: [true, 'Създателят е задължителен'],
        trim: true,
    },
}, {timestamps: true});

export default model('Movie', movieSchema);
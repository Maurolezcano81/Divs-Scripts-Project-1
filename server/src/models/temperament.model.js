import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const temperamentSchema = new Schema({
    Colerico: {
        type: Number,
        default: 0
    },
    Flematico: {
        type: Number,
        default: 0
    },
    Melancolico: {
        type: Number,
        default: 0
    },
    Sanguineo: {
        type: Number,
        default: 0
    },
    Supino: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio'],
    }
}, {
    timestamps: true,
});

temperamentSchema.post('save', async function (doc) {
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(
        doc.user,
        { $addToSet: { temperament: doc._id } }
    );
});

temperamentSchema.plugin(autopopulate);

const Temperament = mongoose.model('Temperament', temperamentSchema);

export default Temperament;
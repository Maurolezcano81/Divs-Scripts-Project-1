import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const temperamentSchema = new Schema({
    colerico: {
        type: Number,
        required: [true, 'El valor colérico es obligatorio']
    },
    flematico: {
        type: Number,
        required: [true, 'El valor flemático es obligatorio']
    },
    melancolico: {
        type: Number,
        required: [true, 'El valor melancólico es obligatorio']
    },
    sanguineo: {
        type: Number,
        required: [true, 'El valor sanguíneo es obligatorio']
    },
    supino: {
        type: Number,
        required: [true, 'El valor supino es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio'],
        autopopulate: { select: 'name email' }
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
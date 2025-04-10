import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const archetypeSchema = new Schema({
    Amante: {
        type: Number,
        default: 0
    },
    Cuidador: {
        type: Number,
        default: 0
    },
    Explorador: {
        type: Number,
        default: 0
    },
    Forajido: {
        type: Number,
        default: 0
    },
    Héroe: {
        type: Number,
        default: 0
    },
    Mago: {
        type: Number,
        default: 0
    },
    Sabio: {
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

archetypeSchema.post('save', async function (doc) {
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(
        doc.user,
        { $addToSet: { archetype: doc._id } }
    );
});

archetypeSchema.plugin(autopopulate);

const Archetype = mongoose.model('Archetype', archetypeSchema);

export default Archetype;
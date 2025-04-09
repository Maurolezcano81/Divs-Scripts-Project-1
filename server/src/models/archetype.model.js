import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const archetypeSchema = new Schema({
    cuidador: {
        type: Number,
        required: [true, 'El valor del cuidador es obligatorio']
    },
    explorador: {
        type: Number,
        required: [true, 'El valor del explorador es obligatorio']
    },
    forajido: {
        type: Number,
        required: [true, 'El valor del forajido es obligatorio']
    },
    heroe: {
        type: Number,
        required: [true, 'El valor del héroe es obligatorio']
    },
    mago: {
        type: Number,
        required: [true, 'El valor del mago es obligatorio']
    },
    sabio: {
        type: Number,
        required: [true, 'El valor del sabio es obligatorio']
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
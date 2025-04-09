import mongoose, { Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const archetypeSchema = new Schema({
    cuidador: {
        type: Number,
        required: [true, 'Cuidador is required']
    },
    explorador: {
        type: Number,
        required: [true, 'Explorador is required']
    },
    forajido: {
        type: Number,
        required: [true, 'Forajido is required']
    },
    heroe: {
        type: Number,
        required: [true, 'Heroe is required']
    },
    mago: {
        type: Number,
        required: [true, 'Mago is required']
    },
    sabio: {
        type: Number,
        required: [true, 'Sabio is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
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
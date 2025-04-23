import User from '../models/users.js';
import Song from '../models/songs.js';
import connection from './db.js';

(async () => {
    try {
        // Sincronizar modelos con la base de datos
        await connection.sync({ force: true }); // Elimina y recrea las tablas
        console.log('Modelos sincronizados con la base de datos.');

        // Crear un usuario
        const user = await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: '1234',
            role: 'user',
        });

        // Crear una canción
        const song = await Song.create({
            title: 'Test Song',
            artist: 'Test Artist',
            difficulty: 'easy',
            tuning: 'Standard',
            tablature_url: 'https://example.com/test-song',
        });

        // Relacionar el usuario con la canción
        await user.addSong(song);

        console.log('Datos de prueba creados correctamente.');

        // Consultar datos relacionados
        const userWithSongs = await User.findOne({
            where: { user_id: user.user_id },
            include: Song,
        });

        console.log('Usuario con canciones relacionadas:', JSON.stringify(userWithSongs, null, 2));
    } catch (error) {
        console.error('Error al probar los modelos:', error);
    } finally {
        await connection.close();
    }
})();
<?php

namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; // Importar la clase Log

class UsersImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // Agregar log para ver los datos que estás importando
        Log::info('Importando fila:', $row);

        // Validar que la columna 'name' no esté vacía
        if (empty($row[0])) {
            Log::warning('Nombre vacío en la fila:', $row);
            return null; // Ignorar esta fila
        }

        return new User([
            'name'     => $row[0], // Asegúrate de que esto sea la columna correcta para el nombre
            'email'    => $row[1], // Asegúrate de que esto sea la columna correcta para el email
            'password' => Hash::make($row[2]), // Asegúrate de que esto sea la columna correcta para la contraseña
        ]);
    }
}

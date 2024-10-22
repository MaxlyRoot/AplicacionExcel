import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, caratulasConfig }) {
    // Estado para controlar la visibilidad del modal y reporte seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inicializa el formulario con useForm, manejando el estado del archivo
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const handleFileChange = (event) => setData("file", event.target.files[0]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!data.file) {
            alert("Seleccione todos los campos obligatorios antes de enviar.");
            return;
        }

        const formData = new FormData();
        formData.append("file", data.file);

        post("/import-reports", {
            data: formData,
            onSuccess: () => {
                reset();
                alert("Archivo cargado y procesado exitosamente!");
            },
            onError: (errors) => {
                console.error(errors);
                alert("Hubo un error al procesar el archivo.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Carga de Archivo</h2>}
        >
            <Head title="Inicio" />

            <div className="py-12 bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 shadow-md sm:rounded-lg">
                        <div className="p-6 text-white">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="flex flex-col items-start">
                                        <span className="flex items-center mb-2 text-sm font-medium text-gray-400">
                                            Selecciona un archivo Excel
                                        </span>
                                        <input
                                            className="w-full block text-sm text-gray-200 border border-gray-600 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 focus:ring focus:ring-blue-500"
                                            id="file_input"
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                        {errors.file && <div className="text-red-500 mt-2">{errors.file}</div>}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 ${
                                            processing ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                        disabled={processing}
                                    >
                                        {processing ? "Enviando..." : "Enviar"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

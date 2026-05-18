export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-600 font-medium animate-pulse">Menghidupkan Mesin...</p>
        </div>
    );
}
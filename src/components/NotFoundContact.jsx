const NotFoundContact = () => {
    return (
        <div className="flex h-[80vh] items-center justify-center gap-4 flex-col bg-cyan-200">
            <div>
                <img src="/notFound.png" />
            </div>
            <h3 className="text-2xl font-semibold text-teal">No Contact Found</h3>
        </div>
    );
};

export default NotFoundContact;
const Slider = () => {
    return (
        <div className="border-bottom border-dark pt-4 pb-4 shadow-lg " style={{ height: 210 }}>
            <h2 className="container pb-2">Shop by category</h2>
            <div className="container d-flex justify-content-between overflow-auto mx-auto pb-sm " style={{ height: 150, }}>
                {/* Category 1 (Hemp CBD) */}
                <div className="mx-sm" style={{ minWidth: '80px', width: '80px' }}>
                    <a
                        href="#"
                        className="d-block text-center"
                        data-testid="Hemp CBD-products-category"
                    >
                        <div className="rounded-circle overflow-hidden mb-lg shadow-lg " style={{ isolation: 'isolate' }}>
                            <div
                                className="image-container block ratio ratio-1x1 position-relative overflow-hidden "
                                data-testid="image-container"
                            >
                                <img
                                    src="https://directus-media.leafly.com/4518dcda-9121-4946-a789-fb90eca19cbd.png?auto=compress,format&w=80&dpr=2"
                                    className="w-100 h-100 position-absolute top-0 start-0 object-cover "
                                    alt="Hemp CBD product example image"
                                    data-testid="image-single-image"
                                />
                            </div>
                        </div>
                        <div className="font-weight-bold text-success text-xs text-underline roboto">Hemp CBD</div>
                    </a>
                </div>

                {/* Category 2 (Delta-8 THC) */}
                <div className="mx-sm" style={{ minWidth: '80px', width: '80px' }}>
                    <a
                        href="#"
                        className="d-block text-center"
                        data-testid="Delta-8 THC-products-category"
                    >
                        <div className="rounded-circle overflow-hidden mb-lg shadow-lg" style={{ isolation: 'isolate' }}>
                            <div
                                className="image-container block ratio ratio-1x1 position-relative overflow-hidden"
                                data-testid="image-container"
                            >
                                <img
                                    src="https://directus-media.leafly.com/3adbab56-b430-4a48-b89a-646c17b58e75.jpeg?auto=compress,format&w=80&dpr=2"
                                    className="w-100 h-100 position-absolute top-0 start-0 object-cover"
                                    alt="Delta-8 THC product example image"
                                    data-testid="image-single-image"
                                />
                            </div>
                        </div>
                        <div className="font-weight-bold text-success text-xs text-underline roboto">
                            Delta-8 THC
                        </div>
                    </a>
                </div>

                {/* Category 3 (Growing) */}
                <div className="mx-sm" style={{ minWidth: '80px', width: '80px' }}>
                    <a
                        href="#"
                        className="d-block text-center"
                        data-testid="Growing-products-category"
                    >
                        <div className="rounded-circle overflow-hidden mb-lg shadow-lg" style={{ isolation: 'isolate' }}>
                            <div
                                className="image-container block ratio ratio-1x1 position-relative overflow-hidden"
                                data-testid="image-container"
                            >
                                <img
                                    src="https://directus-media.leafly.com/aaa16108-6d16-42f0-a008-7923c9a34b24.jpeg?auto=compress,format&w=80&dpr=2"
                                    className="w-100 h-100 position-absolute top-0 start-0 object-cover"
                                    alt="Growing product example image"
                                    data-testid="image-single-image"
                                />
                            </div>
                        </div>
                        <div className="font-weight-bold text-success text-xs text-underline roboto">Growing</div>
                    </a>
                </div>

                {/* Category 4 (Edibles) */}
                <div className="mx-sm" style={{ minWidth: '80px', width: '80px' }}>
                    <a
                        href="#"
                        className="d-block text-center"
                        data-testid="Edibles-products-category"
                    >
                        <div className="rounded-circle overflow-hidden mb-lg shadow-lg" style={{ isolation: 'isolate' }}>
                            <div
                                className="image-container block ratio ratio-1x1 position-relative overflow-hidden"
                                data-testid="image-container"
                            >
                                <img
                                    src="https://directus-media.leafly.com/99f695b6-b44e-426d-bcb9-6cfc235d8e9e.jpeg?auto=compress,format&w=80&dpr=2"
                                    className="w-100 h-100 position-absolute top-0 start-0 object-cover"
                                    alt="Edibles product example image"
                                    data-testid="image-single-image"
                                />
                            </div>
                        </div>
                        <div className="font-weight-bold text-success text-xs text-underline roboto">Edibles</div>
                    </a>
                </div>

                {/* Category 5 (Vaping) */}
                <div className="mx-sm" style={{ minWidth: '80px', width: '80px' }}>
                    <a
                        href="#"
                        className="d-block text-center"
                        data-testid="Vaping-products-category"
                    >
                        <div className="rounded-circle overflow-hidden mb-lg shadow-lg" style={{ isolation: 'isolate' }}>
                            <div
                                className="image-container block ratio ratio-1x1 position-relative overflow-hidden"
                                data-testid="image-container"
                            >
                                <img
                                    src="https://directus-media.leafly.com/3525d308-0150-4e34-b86d-61caf64efd60.jpeg?auto=compress,format&w=80&dpr=2"
                                    className="w-100 h-100 position-absolute top-0 start-0 object-cover"
                                    alt="Vaping product example image"
                                    data-testid="image-single-image"
                                />
                            </div>
                        </div>
                        <div className="font-weight-bold text-success text-xs text-underline roboto">Vaping</div>
                    </a>
                </div>

                {/* Category 6 (Flower) */}
                <div className="mx-sm" style={{ minWidth: '80px', width: '80px' }}>
                    <a
                        href="#"
                        className="d-block text-center"
                        data-testid="Flower-products-category"
                    >
                        <div className="rounded-circle overflow-hidden mb-lg shadow-lg" style={{ isolation: 'isolate' }}>
                            <div
                                className="image-container block ratio ratio-1x1 position-relative overflow-hidden"
                                data-testid="image-container"
                            >
                                <img
                                    src="https://directus-media.leafly.com/8ba00563-dfdd-49a3-875e-b5289bd48d75.jpeg?auto=compress,format&w=80&dpr=2"
                                    className="w-100 h-100 position-absolute top-0 start-0 object-cover"
                                    alt="Flower product example image"
                                    data-testid="image-single-image"
                                />
                            </div>
                        </div>
                        <div className="text-success text-xs text-underline roboto">Flower</div>
                    </a>
                </div>

                {/* Category 7 (Pre-rolls) */}
                <div className="mx-sm" style={{ minWidth: '80px', width: '80px' }}>
                    <a
                        href="#"
                        className="d-block text-center"
                        data-testid="Pre-rolls-products-category"
                    >
                        <div className="rounded-circle overflow-hidden mb-lg shadow-lg" style={{ isolation: 'isolate' }}>
                            <div
                                className="image-container block ratio ratio-1x1 position-relative overflow-hidden"
                                data-testid="image-container"
                            >
                                <img
                                    src="https://directus-media.leafly.com/2191bd5c-32ca-4a09-83c7-7678ea4de3c7.jpeg?auto=compress,format&w=80&dpr=2"
                                    className="w-100 h-100 position-absolute top-0 start-0 object-cover"
                                    alt="Pre-rolls product example image"
                                    data-testid="image-single-image"
                                />
                            </div>
                        </div>
                        <div className="font-weight-bold text-success text-xs text-underline roboto">Pre-rolls</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Slider
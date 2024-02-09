function Legend() {
  return (
    <div className="w-80 my-0 border-8 border-blue-900 rounded-md text-sm">
      <header className="bg-blue-900 text-white text-center w-full mb-3 py-2">
        <h1>Periodo -MES- -AÑO-</h1>
      </header>
      <main className="font-light">
        <section className="flex flex-col items-center mb-1">
          <p className="">Reclamos recibidos:</p>
          <div id="received" className="text-red-500 font-medium">
            0
          </div>
        </section>
        <section className="flex flex-col items-center mb-1">
          <p className="">
            Respecto del mes anterior <span id="upOrDown">aumentaron</span> un:
          </p>
          <div id="increase" className="text-red-500 font-medium">
            0% (+0)
          </div>
        </section>
      </main>
    </div>
  );
}

export default Legend;

import Help from './icons/Help';
import { useState } from 'react';
import Tooltip from './Tooltip';

function Legend() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="w-80 m-2 border-8 border-blue-900 rounded-md text-sm text-center">
      <header className="bg-blue-900 text-white text-center w-full mb-3 py-2 relative">
        <h2 id="legendTitle">Resumen</h2>
        <div
          className={'absolute top-2 right-0 '}
          onMouseEnter={() => {
            setShowTooltip(true);
          }}
          onMouseLeave={() => {
            setShowTooltip(false);
          }}
        >
          <Help width={20} color={'white'} />
          {showTooltip ? <Tooltip /> : null}
        </div>
      </header>
      <main className="font-light pb-2">
        <section className="flex flex-col items-center mb-1">
          <p className="">Reclamos recibidos:</p>
          <div id="received" className="text-red-500 font-medium">
            0
          </div>
        </section>
        <section className="flex flex-col items-center mb-1">
          <p className="px-1">
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

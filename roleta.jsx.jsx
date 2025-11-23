function App() {
  const [step, setStep] = React.useState('register'); // register, spin, result
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '' });
  const [spinning, setSpinning] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const [discount, setDiscount] = React.useState(null);
  const [voucher, setVoucher] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');

  const discounts = [
    { value: '10%', color: '#FF6B6B', angle: 0 },
    { value: '15%', color: '#4ECDC4', angle: 72 },
    { value: '20%', color: '#FFE66D', angle: 144 },
    { value: '30%', color: '#95E1D3', angle: 216 },
    { value: '50%', color: '#F38181', angle: 288 }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setStep('spin');
    }
  };

  const generateVoucher = () => {
    return 'BF2025-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const getExpiryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('pt-BR');
  };

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * discounts.length);
    const selectedDiscount = discounts[randomIndex];
    const spins = 5;
    const finalRotation = (360 * spins) + (360 - selectedDiscount.angle) + (Math.random() * 50 - 25);

    setRotation(finalRotation);

    setTimeout(() => {
      setDiscount(selectedDiscount.value);
      setVoucher(generateVoucher());
      setExpiryDate(getExpiryDate());
      setSpinning(false);
      setStep('result');
    }, 4000);
  };

  const copyVoucher = () => {
    navigator.clipboard.writeText(voucher);
    alert('Voucher copiado!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-50 py-6 px-4 text-center border-b-4 border-yellow-400">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-2 animate-pulse">
          🔥 BLACK FRIDAY 2025 🔥
        </h1>
        <p className="text-xl md:text-2xl text-white">Gire a Roleta e Ganhe Até 50% OFF!</p>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Registration Form */}
        {step === 'register' && (
          <div className="max-w-md mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-yellow-400">
            <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
              Cadastre-se para Girar!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-300 focus:border-yellow-400 focus:outline-none text-white placeholder-gray-300"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-300 focus:border-yellow-400 focus:outline-none text-white placeholder-gray-300"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-300 focus:border-yellow-400 focus:outline-none text-white placeholder-gray-300"
                  placeholder="(00) 0000-0000"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 rounded-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                GIRAR A ROLETA! 🎰
              </button>
            </form>
          </div>
        )}

        {/* Spin Wheel */}
        {step === 'spin' && (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">
              Olá, {formData.name}! 🎉
            </h2>
            <p className="text-xl mb-8">Clique no botão para girar a roleta!</p>

            <div className="relative inline-block mb-8">
              {/* Arrow Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-10">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-16 border-l-transparent border-r-transparent border-t-red-500"></div>
              </div>

              {/* Wheel */}
              <div className="relative w-80 h-80 mx-auto">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full transform transition-transform duration-4000 ease-out"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {discounts.map((item, index) => {
                    const startAngle = item.angle;
                    const endAngle = startAngle + 72;
                    const startRad = (startAngle - 90) * Math.PI / 180;
                    const endRad = (endAngle - 90) * Math.PI / 180;
                    const x1 = 100 + 90 * Math.cos(startRad);
                    const y1 = 100 + 90 * Math.sin(startRad);
                    const x2 = 100 + 90 * Math.cos(endRad);
                    const y2 = 100 + 90 * Math.sin(endRad);
                    const textAngle = startAngle + 36;
                    const textRad = (textAngle - 90) * Math.PI / 180;
                    const textX = 100 + 60 * Math.cos(textRad);
                    const textY = 100 + 60 * Math.sin(textRad);

                    return (
                      <g key={index}>
                        <path
                          d={`M 100 100 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`}
                          fill={item.color}
                          stroke="#fff"
                          strokeWidth="2"
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="font-bold text-xl fill-black"
                          transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                        >
                          {item.value}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx="100" cy="100" r="15" fill="#fff" stroke="#000" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <button
              onClick={spinWheel}
              disabled={spinning}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-12 rounded-full text-2xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-110 transition-all duration-200 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {spinning ? 'GIRANDO... 🎰' : 'GIRAR AGORA! 🎯'}
            </button>
          </div>
        )}

        {/* Result */}
        {step === 'result' && (
          <div className="max-w-md mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-4 border-yellow-400 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                PARABÉNS!
              </h2>
              <p className="text-2xl mb-4">Você ganhou</p>
              <div className="text-7xl font-bold text-green-400 mb-6">
                {discount}
              </div>
              <p className="text-xl mb-2">de desconto!</p>
            </div>

            <div className="bg-black bg-opacity-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-300 mb-2">Seu Voucher:</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <code className="text-2xl font-mono font-bold text-yellow-400 bg-gray-800 px-4 py-2 rounded">
                  {voucher}
                </code>
                <button
                  onClick={copyVoucher}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
                >
                  📋 Copiar
                </button>
              </div>
              <p className="text-sm text-red-300">
                ⏰ Válido até: <span className="font-bold">{expiryDate}</span>
              </p>
              <p className="text-xs text-gray-400 mt-2">(7 dias a partir de hoje)</p>
            </div>

            <div className="bg-yellow-400 bg-opacity-20 rounded-lg p-4 mb-6">
              <p className="text-sm">
                ✉️ Enviamos o voucher para: <br />
                <span className="font-bold">{formData.email}</span>
              </p>
            </div>

            <button
              onClick={() => {
                setStep('register');
                setFormData({ name: '', email: '', phone: '' });
                setRotation(0);
                setDiscount(null);
                setVoucher('');
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
            >
              Voltar ao Início
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 py-6 px-4 text-center mt-12 border-t border-yellow-400">
        <p className="text-sm text-gray-300">
          🎁 Promoção válida enquanto durarem os estoques | Vouchers válidos por 7 dias
        </p>
      </footer>
    </div>
  );
}
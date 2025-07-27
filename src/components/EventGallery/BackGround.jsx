import React from 'react';

function BackGround() {
return (
  <>
    {/* Gradient background */}
    <div
      className="fixed inset-0 w-full h-full -z-30 bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.ibb.co/20q4nLjp/BG-Gradient-1.png')",
        pointerEvents: "none"
      }}
    />
    {/* Vector background */}
    <div
      className="fixed inset-0 w-full h-full -z-20 bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.ibb.co/bMVQh625/Vector.png')",
        pointerEvents: "none"
      }}
    />
    {/* Grid background */}
    <div
      className="h-screen bg-fixed bg-cover"
      style={{
        backgroundImage: "url('https://i.ibb.co/G3QdKhqs/Gallery-Grid.png')",
      }}
    />
  </>
)
}

export default BackGround;

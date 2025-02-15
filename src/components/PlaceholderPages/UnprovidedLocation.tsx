import { unprovidedLocation } from "@/assets/images";

function UnprovidedLocation() {
  return (
    <div className="flex flex-col items-center mt-10">
      <img src={unprovidedLocation} alt="" className="w-60 h-fit" />
      <p className="text-center text-base font-medium text-primary">
        Rất tiếc, MYAmie cần biết vị trí của bạn để kết nối với mọi người
        <br />
        Chọn icon bên cạnh thanh tìm kiếm để bật vị trí
      </p>
    </div>
  );
}

export default UnprovidedLocation;

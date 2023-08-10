const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export interface Coords {
  latitude: number;
  longitude: number;
}

export async function getAddress({ latitude, longitude }: Coords) {
  const res = await fetch(`${URL}?latitude=${latitude}&longitude=${longitude}`);
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

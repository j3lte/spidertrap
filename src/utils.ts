export const randomPathName = (): string => {
  const LENGTH_OF_LINKS = [3, 20];
  const CHAR_SPACE =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-/";
  const length =
    Math.floor(Math.random() * (LENGTH_OF_LINKS[1] - LENGTH_OF_LINKS[0] + 1)) +
    LENGTH_OF_LINKS[0];
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHAR_SPACE.charAt(Math.floor(Math.random() * CHAR_SPACE.length));
  }
  return result;
};

export const randomDate = (): string => {
  const randomDate = new Date(
    Date.now() - Math.floor(Math.random() * 10000000000),
  );
  // Format date to Apache format
  const date = randomDate.toISOString().split("T")[0].split("-");
  const time = randomDate.toISOString().split("T")[1].split(":");
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ][parseInt(date[1]) - 1];
  const randomDateFormatted = `${date[2]}-${month}-${date[0]} ${time[0]}:${
    time[1]
  }`;
  return randomDateFormatted;
};

export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const respondImage = async (path: string): Promise<Response> => {
  const imgPath = path.replace("/icons/", "");
  const filePath = new URL(import.meta.url).pathname;
  const dirPath = filePath.split("/").slice(0, -1).join("/");
  const imgPathFull = `${dirPath}/icons/${imgPath}`;
  const img = await Deno.readFile(imgPathFull);
  return new Response(img, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "public, max-age=31536000",
    },
  });
};

export const respondRobots = (length: number): Response => {
  const randomDisallow = Array.from({ length }).map(
    () => {
      const pathName = randomPathName();
      return `Disallow: /${pathName}/`;
    },
  ).join("\n");
  return new Response(`User-agent: *\n\n${randomDisallow}`, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
};
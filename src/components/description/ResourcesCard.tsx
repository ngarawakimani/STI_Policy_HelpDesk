/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

import { getMetadata, getStorage, ref } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";

import HeroIcon from "@/icons/HeroIcon";

interface DataProps {
  fileUrls: string;
}
const storage = getStorage();

const DescriptionCard = ({ fileUrls }: DataProps) => {
  const forestRef = ref(storage, fileUrls);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [mime, setMimeType] = useState<string | undefined>("");

  const iconSources = (mimeType: string) => {
    const icons: { [key: string]: string } = {
      "application/pdf": "/assets/images/icons/pdf.png",
      "application/msword": "/assets/images/icons/docs.png",
      "application/vnd.ms-excel": "/assets/images/icons/sheets.png",
      "image/jpeg": "path/to/jpeg-icon.png",
    };
    return icons[mimeType];
  };

  function convertToKbMbGb(value: number, isBits: boolean): string {
    const divisor = isBits ? 8000 : 1000;
    let unit = isBits ? "b" : "B";
    const units = ["KB", "MB", "GB"];

    for (let i = 0; i < units.length; i++) {
      if (value < divisor) {
        return `${value.toFixed(2)} ${unit}`;
      }
      value /= divisor;
      unit = units[i] ?? "";
    }
    return `${value.toFixed(2)} ${unit}`;
  }

  function downloadResource(downloadUrl: string, filename: string): void {
    console.log(downloadUrl);
    const downloadFile = async () => {
      try {
        const response = await fetch(downloadUrl, { mode: "no-cors" });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    };
    downloadFile();
  }

  // const handleDownloadClick = useCallback(() => {

  // }, []);

  if (name === "") {
    getMetadata(forestRef)
      .then((metadata) => {
        // Metadata now contains the metadata for 'images/forest.jpg'
        setName(metadata.name);
        setMimeType(metadata.contentType);
        setSize(convertToKbMbGb(metadata.size, true));
        const img = document.getElementById(fileUrls);
        img?.setAttribute("src", fileUrls);
        // Or inserted into an <img> element
      })
      .catch(() => {
        // Uh-oh, an error occurred!
      });
  }
  return (
    <div className="">
      <div className=" group max-w-xs rounded-2xl border border-gray-200 bg-white hover:bg-slate-50">
        <div className="p-5">
          <a href="#">
            <h5 className="mb-1 text-[15px] font-bold tracking-tight text-gray-900 line-clamp-1">
              {name}
            </h5>
            <p className="mb-3 text-xs font-normal text-gray-700">{size}</p>
          </a>
          <a href="#">
            {mime && mime.includes("image") ? (
              <Image className="rounded-lg" src="" id={fileUrls} alt={name} />
            ) : (
              <div className="flex items-center justify-center rounded-lg bg-slate-50 py-10 text-center group-hover:bg-white">
                <Image
                  className="rounded-lg"
                  src={iconSources(mime !== undefined ? mime : "") ?? ""}
                  alt={name}
                  width={70}
                  height={70}
                />
              </div>
            )}
          </a>

          <button
            onClick={() => downloadResource(fileUrls, name)}
            className="mt-3 inline-flex items-center rounded-xl px-3 py-2 text-center text-xs font-medium text-indigo-600 transition hover:bg-indigo-800 hover:text-white hover:underline focus:ring-4 focus:ring-blue-300 marker:focus:outline-none"
          >
            <HeroIcon name="ArrowDownCircleIcon" />
            <span className="mx-2">Download Resource</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCard;

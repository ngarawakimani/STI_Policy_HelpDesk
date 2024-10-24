/* eslint-disable import/no-extraneous-dependencies */
import tw from "tailwind-styled-components";

interface FilePreviewProps {
  fileName: string;
}

const FilePreviewContainer = tw.div`
  bg-gray-100 flex flex-col items-center justify-center rounded-xl
`;

// const FilePreviewImage = tw.img`
//   w-full h-auto object-contain max-h-20 mb-5 px-9
// `;

const FilePreviewName = tw.p`
  text-lg font-medium text-gray-700 m-6 p-9
`;

export default function FilePreview({ fileName }: FilePreviewProps) {
  // const [isImage] = useState(
  //   fileUrl.endsWith(".jpg") ||
  //     fileUrl.endsWith(".jpeg") ||
  //     fileUrl.endsWith(".png") ||
  //     fileUrl.endsWith(".gif")
  // );

  return (
    <FilePreviewContainer>
      {/* {isImage ? (
        <FilePreviewImage src={fileUrl} alt={fileName} />
      ) : (
        <iframe src={fileUrl} className="h-20 w-full border-0" />
      )} */}
      <FilePreviewName>{fileName}</FilePreviewName>
    </FilePreviewContainer>
  );
}

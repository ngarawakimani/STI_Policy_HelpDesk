/* eslint-disable default-case */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import type { FilePondFile } from "filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import type { FilePondProps } from "react-filepond";
import { FilePond, registerPlugin } from "react-filepond";

import { storage } from "@/config/firebase";

import { useStepperContext } from "../contexts/StepperContext";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const OverviewCard = ({ getDone }: any) => {
  // getDone(false);
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [download, setDownload] = useState<string[]>([]);

  const [publications, setPublications] = useState<FilePondFile[]>([]);
  const [downloadPublications, setDownloadPublications] = useState<string[]>(
    []
  );
  const [isUploading, setIsUploading] = useState(false);
  const { userData, setUserData } = useStepperContext();
  const pondOptions: Readonly<FilePondProps> = {
    name: "resume",
    maxFiles: 1,
    allowMultiple: false,
    server: {
      process: (_fieldName, file, _metadata, progress) => {
        return new Promise((resolve, reject) => {
          setIsUploading(true);
          const storageRef = ref(storage, `/documents/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              progress(percentage.toString());
              switch (snapshot.state) {
                case "running":
                  setIsUploading(true);
                  break;
              }
            },
            (uploadError: { message: any }) => {
              reject(uploadError.message);
            },
            async () => {
              // upload is complete, get download URL
              getDownloadURL(storageRef)
                .then((url) => {
                  setDownload([...download, url]);
                  setUserData({
                    ...userData,
                    resume: [...download, url],
                  });
                  setIsUploading(false);
                  resolve(url);
                })
                .catch((_downloadError) => {
                  // console.error(downloadError);
                });
            }
          );
        });
      },

      load: (source, load) => {
        const storageRef = ref(storage, `/documents/${source.name}`);
        getDownloadURL(storageRef).then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = function () {
            const blob = xhr.response;
            load(blob);
          };
          xhr.open("GET", url);
          xhr.send();
        });
      },
    },
  };

  const pondOptionsPublications: Readonly<FilePondProps> = {
    name: "publications",
    maxFiles: 3,
    allowMultiple: true,
    server: {
      process: (_fieldName, file, _metadata, progress) => {
        return new Promise((resolve, reject) => {
          setIsUploading(true);
          const storageRef = ref(storage, `/documents/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              progress(percentage.toString());
              switch (snapshot.state) {
                case "running":
                  setIsUploading(true);
                  break;
              }
            },
            (uploadError: { message: any }) => {
              reject(uploadError.message);
            },
            async () => {
              // upload is complete, get download URL
              getDownloadURL(storageRef)
                .then((url) => {
                  setDownloadPublications([...downloadPublications, url]);
                  setUserData({
                    ...userData,
                    downloadUrls: [...downloadPublications, url],
                  });
                  setIsUploading(false);
                  resolve(url);
                })
                .catch((_downloadError) => {
                  // console.error(downloadError);
                });
            }
          );
        });
      },

      load: (source, load) => {
        const storageRef = ref(storage, `/documents/${source.name}`);
        getDownloadURL(storageRef).then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = function () {
            const blob = xhr.response;
            load(blob);
          };
          xhr.open("GET", url);
          xhr.send();
        });
      },
    },
  };

  useEffect(() => {
    if (files.length <= download.length && !isUploading) {
      if (publications.length > downloadPublications.length && isUploading) {
        getDone(false);
      } else {
        getDone(true);
      }
    } else {
      getDone(false);
    }
    console.log(
      files.length <= download.length,
      publications.length > downloadPublications.length,
      files.length,
      download.length,
      publications.length,
      downloadPublications.length,
      isUploading
    );
  }, [files, download, downloadPublications, publications, isUploading]);

  const savetoState = async (e: any) => {
    e.preventDefault();
    if (download.length > 0) {
      setUserData({ ...userData, downloadUrls: download });
    }
  };

  return (
    <div>
      <div>
        <div className="mt-3 mb-1 px-5 text-xl font-bold text-slate-900 sm:text-2xl">
          Publication Details
        </div>
        <div className="relative mx-5 items-center self-center overflow-hidden text-slate-600 focus-within:text-gray-400">
          <div className="mb-4 text-xs font-normal text-gray-600">
            This information will be displayed publicly on through the STI
            Policy Helpdesk domain.
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <form action="#" onSubmit={savetoState}>
            <div className="sm:overflow-hidden">
              <div className="space-y-6 px-4 py-2 sm:p-5">
                <div>
                  <label
                    className="block text-base font-medium text-slate-900"
                    htmlFor="multiple_files"
                  >
                    Upload your Resume.
                  </label>
                  <FilePond
                    files={files.map((file) => file.file)}
                    onupdatefiles={setFiles}
                    {...pondOptions}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>. You can upload only 1 resume'
                  />
                  <div className="mt-2 text-xs font-normal text-slate-700">
                    You can upload your resume in any document type
                  </div>
                </div>
                <hr className="my-8 h-px border-0 bg-gray-200"></hr>
                <div>
                  <label
                    className="block text-base font-medium text-slate-900"
                    htmlFor="multiple_files"
                  >
                    Upload upto 3 relevant publications.
                  </label>
                  <FilePond
                    files={publications.map((file) => file.file)}
                    onupdatefiles={setPublications}
                    {...pondOptionsPublications}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>. You can upload only 3 files i.e maximum of 3 relevant publications'
                  />
                  <div className="mt-2 text-xs font-normal text-slate-700">
                    You can upload multiple files of any document type
                  </div>
                </div>
                {/* <hr className="my-8 h-px border-0 bg-gray-200"></hr>
                {!isUploading && (
                  <div className="grid grid-cols-2 divide-x">
                    <div className="px-2">
                      <label
                        htmlFor="sector_focus"
                        className="block text-base font-medium text-slate-900"
                      >
                        Area of Focus
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <select
                          name="sector_focus"
                          id="sector_focus"
                          className="block w-full flex-1 rounded-2xl border-2 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                          placeholder=""
                          value={userData.sector_focus}
                          onChange={handleChange}
                          required
                        >
                          <option value="sti">STI</option>
                          <option value="funding">Funding</option>
                          <option value="assessment">Assessment</option>
                        </select>
                      </div>
                      <div className="mt-2 text-xs font-normal text-slate-700">
                        Area of focus of your request i.e Agriculture,
                        Industrial.
                      </div>
                    </div>
                  </div>
                )} */}

                {/* <hr className="my-8 h-px border-0 bg-gray-200"></hr> */}

                {/* <hr className="my-8 h-px border-0 bg-gray-200"></hr>
                <div className="bg-gray-50 px-4 text-right">
                  <button
                    type="button"
                    className="mr-2 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    Next
                  </button>
                </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;

// import React, { useState } from "react";
// import Overlay from "../overlays/Overlay";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
// import yup from "yup";
// import { testSchema } from "../form/validation";
// import FormShortTextField from "../form/fields/FormShortTextField";
// import FormLongTextField from "../form/fields/FormLongTextField";
// import FormSelectBoxField from "../form/fields/FormSelectBoxField";
// import { IoClose } from "react-icons/io5";

// type ContactFormData = yup.InferType<typeof testSchema>;

// type ModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };
// const Modal = ({ isOpen, onClose }: ModalProps) => {
//   const methods = useForm<ContactFormData>({
//     resolver: yupResolver(testSchema), // Yupとの紐づけ
//     mode: "onBlur", // バリデーションチェックのタイミングを設定
//     // 初期値を明示的に設定
//     defaultValues: {
//       // 初期値を明示的に設定
//       email: "",
//     },
//   });
//   const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
//     //入力したデータを使って任意の処理を実装する
//     console.log(data);
//   };
//   // モーダルコンテンツのクリックイベントが伝播しないようにするハンドラー
//   const handleModalContentClick = (e: React.MouseEvent) => {
//     e.stopPropagation(); // イベントの伝播を停止
//   };

//   return (
//     <Overlay isOpen={isOpen} onClose={onClose}>
//       <div className="w-[50%] max-h-full animate-slideInBckTop">
//         <div className="py-10">
//           <button
//             type="button"
//             className="float-right mr-5 mt-3"
//             onClick={onClose}
//           >
//             <IoClose className="w-[25px] h-[25px] text-textColor3" />
//           </button>
//           <div
//             className="bg-white rounded-radius1 shadow-lg px-10 py-7"
//             onClick={handleModalContentClick}
//           >
//             <p className="text-center text-[16px] font-medium text-textColor3">
//               新規タスク作成
//             </p>

//             <FormProvider {...methods}>
//               <form
//                 className="mt-5 grid grid-cols-1 gap-8"
//                 onSubmit={methods.handleSubmit(onSubmit)}
//               >
//                 <FormShortTextField name="email" label="メールアドレス" />
//                 <FormLongTextField name="email" label="テスト" />
//                 <FormSelectBoxField
//                   name="selectBox"
//                   label="選択"
//                   options={[
//                     { label: "選択肢1", value: "1" },
//                     { label: "選択肢2", value: "2" },
//                   ]}
//                 />

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="text-center">
//                     <button
//                       className="btn1 min-w-[50%]"
//                       type="submit"
//                       onClick={onClose}
//                     >
//                       新規タスク作成
//                     </button>
//                   </div>
//                   <div className="text-center">
//                     <button
//                       className="btn1 w-full"
//                       type="submit"
//                       onClick={onClose}
//                     >
//                       作成
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </FormProvider>
//           </div>
//         </div>
//       </div>
//     </Overlay>
//   );
// };

// export default Modal;

/* eslint-disable @next/next/no-img-element */
"use client";

import { MoreHorizontal } from "lucide-react";

type CardExerciseProps = {
  videoLink?: string;
  name: string;
  sets: number;
  repetitions: Array<number>;
  observation: string
  onDeleteExercise: () => void;
  onEditExercise: () => void;
}

export const CardExercise = ({ name, sets, repetitions, observation, videoLink, onDeleteExercise, onEditExercise }: CardExerciseProps) => {
  const handleVideoClick = () => {
    window.open(videoLink, '_blank');
  };

  return (
    <div className="text-base-neutral-content font-text-size-4 bg-neutral relative box-border flex w-[243px] flex-col items-start justify-start gap-4 rounded-2xl p-4 text-left text-base">
      {/* Let's remove this, for now */}
      {/* <embed className="relative aspect-video w-full max-w-full shrink-0 rounded-[10.87px] object-cover" src={videoLink} /> */}
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <div className="flex flex-col items-start justify-start self-stretch">
          <div className="relative self-stretch font-semibold leading-[24px]">{name}</div>
          <div className="flex flex-col items-start justify-start gap-[3.62px] self-stretch rounded px-0 py-[7.247446537017822px] text-sm">
            <div className="relative self-stretch leading-[20px]">{observation}</div>
            <div className="flex flex-row items-start justify-start gap-[7.25px] self-stretch">
              <div className="relative font-semibold leading-[20px]">Sets:</div>
              <div className="relative flex-1 leading-[20px]">{sets}</div>
            </div>
            <div className="flex flex-row items-start justify-start gap-[7.25px] self-stretch">
              <div className="relative font-semibold leading-[20px]">Repetitions:</div>
              <div className="relative flex-1 leading-[20px]">{repetitions.toString()}</div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-between gap-2 space-x-4">
          <button className='btn btn-primary btn-md flex-1' onClick={handleVideoClick}>
            See Video
          </button>

          <div className='dropdown-start dropdown dropdown-bottom border-base-content rounded-lg border-2 p-2'>
            <div tabIndex={0} role="button" aria-label="dropdown" className="" >
              <MoreHorizontal className="to-base-content" />
            </div>
            <ul tabIndex={0} className="menu dropdown-content rounded-box bg-base-100 z-[1] w-52 p-2 shadow">
              <li><label htmlFor="editExercise" onClick={onEditExercise}>Edit</label></li>
              <li><a href='#' onClick={onDeleteExercise}>Remove</a></li>
            </ul>
          </div>

        </div>
      </div>
    </div>);
};


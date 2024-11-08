import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import BackupIcon from '@mui/icons-material/Backup';
import Styles from './index.module.scss';

const DndContainer = (props: any) => {
    const { onDrop, onClick } = props;
    const dragHandle = useRef<any>(null);

    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: [NativeTypes.FILE],
            drop(item: any) {
                if (onDrop) {
                    onDrop(item);
                }
            },
            canDrop(item) {
                const includesUnsupportedFiles = item.files.some((file: any) => {
                    return !file.type.includes('image');
                });
                return includesUnsupportedFiles ? false : true;
            },
            hover(item) {},
            collect: (monitor) => {
                const item = monitor.getItem();
                if (item) {
                }
                return {
                    isOver: monitor.isOver(),
                    canDrop: monitor.canDrop(),
                };
            },
        }),
        [props]
    );

    useEffect(() => {
        const onDragOver = (e: Event) => {
            document.body.classList.add('user-is-dragging');
            clearTimeout(dragHandle.current as any);
            dragHandle.current = setTimeout(() => {
                document.body.classList.remove('user-is-dragging');
            }, 200);
        };

        document.body.addEventListener('dragover', onDragOver);

        return () => {
            document.body.removeEventListener('dragover', onDragOver);
        };
    }, []);

    return (
        <div draggable={true} ref={drop} className={Styles.dndContainer} onClick={onClick}>
            <div className="border-4 border-white border-dashed w-full h-full text-center flex flex-col items-center justify-center">
                <BackupIcon className="text-[2.5rem] text-[var(--primary-color)]" />
                <span className="text-lg font-semibold">
                    {canDrop && isOver ? 'Release to drop' : 'Drag and drop a file here'}
                </span>
                {!canDrop && !isOver && (
                    <span className="text-lg">
                        Or{' '}
                        <span className="text-[var(--primary-color)] font-normal">
                            Select a file
                        </span>
                    </span>
                )}
                <span className="text-slate-400 text-sm mt-2.5">Suported formats: JPG, JPEG, PNG, WEBP</span>
            </div>
        </div>
    );
};

export default DndContainer;

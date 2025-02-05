import { Palette } from '@mui/icons-material';
import React from 'react';
import { ClickAwayListener } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ThemeColorPickerProps {
    isDarkTheme: any;
    onClose: () => void;
    currentColor: string;
    onColorSelect: (color: string) => void;
}

const themeColors: any[] = [
    { name: 'blue', primary: 'bg-blue-500', hover: 'hover:bg-blue-600' },
    { name: 'purple', primary: 'bg-purple-500', hover: 'hover:bg-purple-600' },
    { name: 'green', primary: 'bg-green-500', hover: 'hover:bg-green-600' },
    { name: 'red', primary: 'bg-red-500', hover: 'hover:bg-red-600' },
    { name: 'pink', primary: 'bg-pink-500', hover: 'hover:bg-pink-600' },
    { name: 'indigo', primary: 'bg-indigo-500', hover: 'hover:bg-indigo-600' },
    { name: 'amber', primary: 'bg-amber-500', hover: 'hover:bg-amber-600' },
];

export const ThemeColorPicker: React.FC<ThemeColorPickerProps> = ({
    isDarkTheme,
    onClose,
    currentColor,
    onColorSelect,
}) => {
    return (<>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-600'}`}>
                    Choose Theme Color
                </span>
            </div>
            <CloseIcon
                aria-label="close"
                onClick={onClose}
                sx={(theme) => ({
                    color: theme.palette.grey[500],
                })}
                style={{
                    cursor: 'pointer',
                }}
            />
        </div>

        <div className="grid grid-cols-4 gap-4">
            {themeColors.map((color) => (
                <button
                    key={color.name}
                    onClick={() => {
                        onColorSelect(color.name);
                        onClose();
                    }}
                    className={`
                w-16 h-16 rounded-full ${color.primary} 
                transition-transform duration-200 ease-in-out
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${currentColor === color.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''}
              `}
                    title={color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                />
            ))}
        </div>
    </>
    );
};
import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './Main.scss';
import { Button, CircularProgress } from '@material-ui/core';

const Main = () => {
    const [file, setFile] = useState<File>();
    const [drag, setDrag] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);
    const [info, setInfo] = useState<boolean>(false);

    const dragStartHandle = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandle = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFile(file);
        setDrag(false);
        setSelected(true);
    }

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFile(file);
            setDrag(false);
            setSelected(true);
        }
    };

    const uploadedJSX =
        <>
            <div className='text upload'>Uploaded!</div>
            <div className='file-name'>{file?.name}</div>
            <div className='button-wrapper'>
                <Button
                    variant='contained'
                    color='primary'
                    className='button'
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            setInfo(true);
                        }, 2000);
                    }}
                >
                    get info
                </Button>
            </div>
        </>;

    const dragJSX =
        <>
            <div className='text small'>Upload a picture of your meal and get information about it</div>
            <div className='button-wrapper'>
                <Button variant='contained' color='primary' className='button' component='label'>
                    Open file
                    <input type='file' onChange={onFileChange} hidden/>
                </Button>
            </div>
            <div className='text extra-small'>or drop file here</div>`
        </>;

    const dropJSX = <div className='drop-text'>Drop a picture!</div>;

    const infoJSX =
        <>
            <div className='text upload'>Nutritional information about your meal:</div>
            <div className='info-wrapper'>
                <div className='info'>
                    <div>Calories:</div>
                    <div style={{marginTop: '5px'}}>Fat:</div>
                    <div style={{marginTop: '5px'}}>Protein</div>
                    <div style={{marginTop: '5px'}}>Carbs:</div>
                </div>
            </div>
            <div className='button-wrapper'>
                <Button variant='contained' color='primary' className='button'>
                    add to diary
                </Button>
            </div>
        </>;

    return (
        <Layout>
            <div className='main-page-wrapper'>
                <div className='text'>THE FIRST WEALTH IS HEALTH</div>
                <div className='text'>SHOW US WHAT YOU EAT DAILY AND WE WILL TAKE CARE OF YOUR FOOD HABITS</div>
                <div onDragStart={dragStartHandle}
                     onDragLeave={dragLeaveHandle}
                     onDragOver={dragStartHandle}
                     onDrop={drag ? onDropHandler : undefined}
                     className={drag ? 'drag-area': 'drag-area none'}
                >
                    {
                        loading ?
                            <div className='loading-wrapper'><CircularProgress className={loading ? 'loading' : 'loading done'} size='50px'/></div>
                            : info ? infoJSX : drag ?  dropJSX : selected ? uploadedJSX : dragJSX
                    }
                </div>
                <div className='rules-wrapper' style={info ? {marginTop: '100px'} : undefined}>
                    {['Please, put your meal in medium sized dish so we can understand the amount of food better',
                    'Try to show every product you got in your meal to precise calories ',
                    'Take a photo at a 45 degree angle so we can understand the volume of food and dish better'].map(item => {
                        return (
                            <div className='rule-wrapper'>
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default Main;

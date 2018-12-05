import * as React from 'react'

import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const img = '/images/bgImage.jpg';

const styles = ({palette}: Theme) => createStyles({
    root: {
        backgroundColor: palette.primary.dark,
        height:'40vh',
        maxHeight:'40vh'
    },
    imageSize: {
        width: '100%',
        overflow: "hidden"
    }
});

interface IBackgroundImageProps {
    classes: any;
    imagePath?: string
}

export class BackgroundImage extends React.Component<IBackgroundImageProps & React.HTMLAttributes<HTMLDivElement>> {
    render() {
        return (
            <div className={`${this.props.classes.root} ${this.props.classes.imageSize} ${this.props.className}`}>
                <img className={this.props.classes.imageSize} src={this.props.imagePath || img} />
            </div>
        )
    }
}

export default withStyles(styles)(BackgroundImage);

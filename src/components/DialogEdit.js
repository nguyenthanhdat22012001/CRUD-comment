import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class DialogEdit extends React.Component {
    constructor(props) {
        super(props);
        this.refInputEditComment = React.createRef();
    }
    render() {
        const { action } = this.props;
        return (
            <Dialog
                open={action.isOpenEditCommnet}
                onClose={() => this.props.handleOpenEditCommnet(false)}
            >
                <DialogTitle>Sửa bình luận</DialogTitle>
                <DialogContent>
                    <div
                        style={{
                            width: 500,
                            marginTop: '10px',
                            paddingTop: '10px',
                        }}
                    >
                        <TextField
                            id="outlined-multiline-static"
                            label="Bình luận"
                            fullWidth
                            multiline
                            rows={2}
                            ref={this.refInputEditComment}
                            defaultValue={action.comment ? action.comment.content : ''}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.handleOpenEditCommnet(false)}>hủy</Button>
                    <Button onClick={() => this.props.handleEditComment(this.refInputEditComment.current.children[1].firstChild.value)}>sửa</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default DialogEdit;
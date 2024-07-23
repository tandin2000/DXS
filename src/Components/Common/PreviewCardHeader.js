import React from 'react';
import { h4, Input, Label } from 'reactstrap';

const Previewh4 = ({ title }) => {
    return (
        <React.Fragment>
            <h4 className="align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">{title}</h4>
                <div className="flex-shrink-0">
                    <div className="form-check form-switch form-switch-right form-switch-md">
                        <Label className="form-label text-muted">Show Code</Label>
                        <Input className="form-check-input code-switcher" type="checkbox" />
                    </div>
                </div>
            </h4>
        </React.Fragment>
    );
}

export default Previewh4;
import { useState } from 'react';
import { ParamItem } from './types';

const useParams = () => {
    const [params, setParams] = useState<ParamItem>({});

    return { params, setParams };
};

export default useParams;

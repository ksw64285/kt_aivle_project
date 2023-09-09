import {
    GET_JOB_LIST_FAIL,
    GET_JOB_LIST_SUCCESS,
    ADD_JOB_LIST_SUCCESS,
    ADD_JOB_LIST_FAIL,
    UPDATE_JOB_LIST_SUCCESS,
    UPDATE_JOB_LIST_FAIL,
    DELETE_JOB_LIST_SUCCESS,
    DELETE_JOB_LIST_FAIL,
    GET_APPLY_JOB_SUCCESS,
    GET_APPLY_JOB_FAIL,
    DELETE_APPLY_JOB_SUCCESS,
    DELETE_APPLY_JOB_FAIL,
    FETCH_BLOG_REQUEST,
    FETCH_BLOG_SUCCESS,
    FETCH_BLOG_FAILURE,
} from "./actionTypes";

const INIT_STATE = {
    jobs: [],
    error: {},
    jobApply: [],
}
const initialState = {
    blogs: [],
    loading: false,
    error: null
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BLOG_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_BLOG_SUCCESS:
        return {
          ...state,
          blogs: action.payload,
          loading: false,
          error: null
        };
      case FETCH_BLOG_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };

const JobReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_JOB_LIST_SUCCESS:
            return {
                ...state,
                jobs: action.payload,
            };

        case GET_JOB_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case ADD_JOB_LIST_SUCCESS:           
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
            };

        case ADD_JOB_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_JOB_LIST_SUCCESS:
            return {
                ...state,
                jobs: state.jobs.map(job =>
                    job.id.toString() === action.payload.id.toString()
                        ? { job, ...action.payload }
                        : job
                ),
            };

        case UPDATE_JOB_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_JOB_LIST_SUCCESS:
            return {
                ...state,
                jobs: state.jobs.filter(
                    job => job.id.toString() !== action.payload.toString()
                ),
            };

        case DELETE_JOB_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case GET_APPLY_JOB_SUCCESS:
            return {
                ...state,
                jobApply: action.payload,
            };
        case GET_APPLY_JOB_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case DELETE_APPLY_JOB_SUCCESS:
            return {
                ...state,
                jobApply: state.jobApply.filter(data => data.id.toString() !== action.payload.toString())
            };
        case DELETE_APPLY_JOB_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state
    }
}

export default blogReducer;
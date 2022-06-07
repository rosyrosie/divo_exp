import create from 'zustand';

interface StoreType{
  corpId: string | null;
  setCorpId: (corpId: string) => void;
}

const useStore = create<StoreType>(set => ({
  corpId: null,
  setCorpId: corpId => set(state => ({ ...state, corpId }))
}));

export default useStore;
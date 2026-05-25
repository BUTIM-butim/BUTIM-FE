import { useEffect, useMemo, useState } from 'react';
import CloseIcon from '../common/icons/CloseIcon';
import {
  regionApi,
  type SidoResponse,
  type SigunguResponse,
} from '../../apis/region';
import Button from '../common/button/Button';

type RegionSelectModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (region: {
    regionId: string;
    regionName: string;
    sidoName: string;
    sigunguName: string;
  }) => void;
};

const SearchIcon = () => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.708 14.25C11.768 14.25 14.25 11.768 14.25 8.708C14.25 5.649 11.768 3.167 8.708 3.167C5.649 3.167 3.167 5.649 3.167 8.708C3.167 11.768 5.649 14.25 8.708 14.25Z"
        stroke="#4E5A6C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.833 15.833L12.667 12.667"
        stroke="#4E5A6C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CheckIcon = ({ checked }: { checked: boolean }) => {
  if (checked) {
    return (
      <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border-[1.2px] border-button-blue bg-button-blue">
        <svg
          width="9"
          height="7"
          viewBox="0 0 9 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.4 3.5L3.35 5.45L7.25 1.55"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border-[1.2px] border-placeholder-gray bg-white" />
  );
};

const AlertIcon = () => {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-80"
    >
      <path
        d="M26 17.333V26M26 34.667H26.021M6.5 26C6.5 28.561 7.004 31.096 7.984 33.462C8.964 35.828 10.4 37.978 12.211 39.789C14.022 41.599 16.172 43.036 18.537 44.016C20.903 44.996 23.439 45.5 26 45.5C28.561 45.5 31.096 44.996 33.462 44.016C35.828 43.036 37.978 41.599 39.788 39.789C41.599 37.978 43.035 35.828 44.015 33.462C44.995 31.096 45.5 28.561 45.5 26C45.5 20.828 43.445 15.868 39.788 12.211C36.131 8.554 31.172 6.5 26 6.5C20.828 6.5 15.868 8.554 12.211 12.211C8.554 15.868 6.5 20.828 6.5 26Z"
        stroke="#989EA9"
        strokeWidth="3.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function RegionSelectModal({
  open,
  onClose,
  onConfirm,
}: RegionSelectModalProps) {
  const [sidos, setSidos] = useState<SidoResponse[]>([]);
  const [sigungus, setSigungus] = useState<SigunguResponse[]>([]);

  const [selectedSido, setSelectedSido] = useState<SidoResponse | null>(null);
  const [selectedSigungu, setSelectedSigungu] =
    useState<SigunguResponse | null>(null);

  const [keyword, setKeyword] = useState('');
  const [loadingSido, setLoadingSido] = useState(false);
  const [loadingSigungu, setLoadingSigungu] = useState(false);

  useEffect(() => {
    if (!open) return;

    setSelectedSido(null);
    setSelectedSigungu(null);
    setSigungus([]);
    setKeyword('');
    setLoadingSido(true);

    regionApi
      .getSidoList()
      .then((data) => {
        const sortedSidos = [...data].sort((a, b) =>
          a.sidoName.trim().localeCompare(b.sidoName.trim(), 'ko-KR'),
        );

        setSidos(sortedSidos);
      })
      .finally(() => setLoadingSido(false));
  }, [open]);

  useEffect(() => {
    if (!open || !selectedSido) return;

    setLoadingSigungu(true);
    setSelectedSigungu(null);
    setKeyword('');

    regionApi
      .getSigunguList(selectedSido.sidoCode)
      .then((data) => {
        const sortedSigungus = [...data].sort((a, b) =>
          a.sigunguName.trim().localeCompare(b.sigunguName.trim(), 'ko-KR'),
        );

        setSigungus(sortedSigungus);
      })
      .finally(() => setLoadingSigungu(false));
  }, [open, selectedSido]);

  const filteredSigungus = useMemo(() => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) return sigungus;

    return sigungus.filter((item) =>
      item.sigunguName.trim().includes(trimmedKeyword),
    );
  }, [keyword, sigungus]);

  if (!open) return null;

  const canConfirm = selectedSido !== null && selectedSigungu !== null;

  const handleConfirm = () => {
    if (!selectedSido || !selectedSigungu) return;

    onConfirm({
      regionId: String(selectedSigungu.regionId),
      regionName: `${selectedSido.sidoName} ${selectedSigungu.sigunguName}`,
      sidoName: selectedSido.sidoName,
      sigunguName: selectedSigungu.sigunguName,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative h-[478px] w-[723px] overflow-hidden rounded-[16px] bg-white shadow-[0px_0px_24.8px_2px_rgba(31,41,55,0.12)]">
        <div className="flex h-[401px]">
          <aside className="w-[196px] shrink-0 border-r border-line-gray bg-white">
            <div className="h-[79px] px-[26px] pt-[26px]">
              <h2 className="text-[28px] font-medium leading-[33px] tracking-[-0.02em] text-text-black">
                지역 선택
              </h2>
            </div>

            <div className="h-[322px] overflow-y-auto px-[23px]">
              {loadingSido ? (
                <p className="typo-navbar-button text-placeholder-gray">
                  불러오는 중...
                </p>
              ) : (
                sidos.map((sido) => {
                  const isSidoSelected =
                    selectedSido?.sidoCode === sido.sidoCode;

                  return (
                    <button
                      key={sido.sidoCode}
                      type="button"
                      onClick={() => {
                        setSelectedSido(sido);
                        setSelectedSigungu(null);
                      }}
                      className={`flex h-[34px] w-[172px] items-center border-b border-line-gray px-[7px] text-left typo-navbar-button ${
                        isSidoSelected
                          ? 'border-l-[2px] border-l-text-blue bg-card-background-blue text-navbar-blue'
                          : 'border-l-[2px] border-l-transparent text-text-gray'
                      }`}
                    >
                      {sido.sidoName}
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          <section className="relative flex-1 bg-white">
            <button
              type="button"
              onClick={onClose}
              aria-label="지역 선택 창 닫기"
              className="absolute right-[23px] top-[22px] z-20 flex h-[31px] w-[31px] cursor-pointer items-center justify-center rounded-[8px]"
            >
              <CloseIcon />
            </button>

            {selectedSido && (
              <>
                <div className="absolute left-[24px] top-[25px] flex w-[475px] flex-col gap-[18px]">
                  <h3 className="text-[23px] font-medium leading-[27px] tracking-[-0.01em] text-text-black">
                    {selectedSido.sidoName}
                  </h3>

                  <div className="h-[47px] rounded-[10px] bg-gradient-to-br from-[#0070FC] via-[#0099B8] to-[#00A89C] p-[2.2px]">
                    <div className="flex h-full w-full items-center justify-between rounded-[8px] bg-white px-[16px]">
                      <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="시/군/구를 검색해주세요."
                        className="w-full bg-transparent typo-navbar-button text-text-black outline-none placeholder:text-placeholder-gray"
                      />
                      <SearchIcon />
                    </div>
                  </div>
                </div>

                <p className="absolute left-[24px] top-[146px] text-[18px] font-medium leading-[21px] text-title-gray">
                  전체 시/군/구
                </p>

                <div className="absolute left-[24px] top-[179px] h-[222px] w-[475px] overflow-y-auto">
                  {loadingSigungu ? (
                    <p className="typo-navbar-button text-placeholder-gray">
                      불러오는 중...
                    </p>
                  ) : filteredSigungus.length === 0 ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-[14px]">
                      <AlertIcon />

                      <div className="flex flex-col items-center gap-[12px]">
                        <p className="text-center text-[23px] font-medium leading-[27px] tracking-[-0.01em] text-number-gray">
                          검색 결과가 없습니다.
                        </p>
                        <p className="text-center typo-navbar-button text-text-gray">
                          다른 검색어를 입력해주세요.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full flex-col gap-[10px]">
                      {filteredSigungus.map((sigungu) => {
                        const isSigunguSelected =
                          selectedSigungu !== null &&
                          String(selectedSigungu.sigunguCode) ===
                            String(sigungu.sigunguCode);

                        return (
                          <button
                            key={sigungu.sigunguCode}
                            type="button"
                            onClick={() => setSelectedSigungu(sigungu)}
                            className={`flex h-[47px] w-[475px] shrink-0 items-center gap-[8px] rounded-[10px] border-[1.4px] px-[16px] typo-navbar-button ${
                              isSigunguSelected
                                ? 'border-button-blue bg-card-background-blue text-navbar-blue'
                                : 'border-line-gray bg-white text-text-gray'
                            }`}
                          >
                            <CheckIcon checked={isSigunguSelected} />
                            <span>{sigungu.sigunguName}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        </div>

        <footer className="absolute bottom-0 left-0 flex h-[77px] w-full items-center justify-between border-t border-line-gray bg-white px-[26px]">
          <Button
            variant="gray"
            size="information"
            hasArrow
            arrowDirection="left"
            onClick={onClose}
          >
            취소
          </Button>

          <Button
            variant="blue"
            size="information"
            hasArrow
            arrowDirection="right"
            disabled={!canConfirm}
            onClick={handleConfirm}
          >
            확인
          </Button>
        </footer>
      </div>
    </div>
  );
}